"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Scissors, Hand, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Choice = "rock" | "paper" | "scissors" | null
type Result = "win" | "lose" | "draw" | null

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null)
  const [computerChoice, setComputerChoice] = useState<Choice>(null)
  const [result, setResult] = useState<Result>(null)
  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const choices: Choice[] = ["rock", "paper", "scissors"]

  const choiceIcons = {
    rock: <Hand className="size-8" />,
    paper: <FileText className="size-8" />,
    scissors: <Scissors className="size-8" />,
  }

  const resultMessages = {
    win: "You win!",
    lose: "Computer wins!",
    draw: "It's a draw!",
  }

  const getComputerChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * 3)
    return choices[randomIndex]
  }

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return "draw"

    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "win"
    }

    return "lose"
  }

  const handleChoice = (choice: Choice) => {
    if (isAnimating) return

    setIsAnimating(true)
    setPlayerChoice(choice)
    setComputerChoice(null)
    setResult(null)

    // Simular el "pensamiento" de la computadora
    setTimeout(() => {
      const computer = getComputerChoice()
      setComputerChoice(computer)

      const gameResult = determineWinner(choice, computer)
      setResult(gameResult)

      if (gameResult === "win") {
        setPlayerScore((prev) => prev + 1)
      } else if (gameResult === "lose") {
        setComputerScore((prev) => prev + 1)
      }

      setIsAnimating(false)
    }, 1000)
  }

  const resetGame = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
    setPlayerScore(0)
    setComputerScore(0)
  }

  // Page
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold capitalize">Rock, paper & scissors</CardTitle>
          <CardDescription>Choose your weapon!</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex justify-between mb-8">
            <div className="text-center">
              <p className="text-sm font-medium mb-1">You</p>
              <p className="text-2xl font-bold">{playerScore}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium mb-1">Computer</p>
              <p className="text-2xl font-bold">{computerScore}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {playerChoice ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                    {choiceIcons[playerChoice]}
                  </motion.div>
                ) : (
                  <p className="text-muted-foreground">?</p>
                )}
              </div>
              <p className="font-medium">Your choice</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {computerChoice ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                    {choiceIcons[computerChoice]}
                  </motion.div>
                ) : (
                  <p className="text-muted-foreground">?</p>
                )}
              </div>
              <p className="font-medium">Computer's choice</p>
            </div>
          </div>

          {result && (
            <motion.div
              className={cn(
                "text-center p-3 rounded-md mb-6 font-bold text-lg",
                result === "win"
                  ? "bg-green-100 text-green-800"
                  : result === "lose"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800",
              )}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {resultMessages[result]}
            </motion.div>
          )}

          <div className="flex justify-center gap-4">
            {choices.map((choice) => (
              <Button
                key={choice}
                variant={playerChoice === choice ? "default" : "outline"}
                size="lg"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => handleChoice(choice)}
                disabled={isAnimating}
              >
                {choiceIcons[choice]}
                <span className="mt-2 capitalize">{choice}</span>
              </Button>
            ))}
          </div>
        </CardContent>

        <CardFooter>
          <Button variant="outline" className="w-full" onClick={resetGame}>
            Reset Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}