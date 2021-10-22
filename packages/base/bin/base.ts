#!/usr/bin/env node
import arg from 'arg'
;['react', 'react-dom'].forEach((dependency) => {
  try {
    // When 'npm link' is used it checks the clone location. Not the project.
    require.resolve(dependency)
  } catch (err) {
    console.warn(
      `The module '${dependency}' was not found. Next.js requires that you include it in 'dependencies' of your 'package.json'. To add it, run 'npm install ${dependency}'`
    )
  }
})

const defaultCommand = 'dev'
export type cliCommand = (argv?: string[]) => void
const commands: { [command: string]: () => Promise<cliCommand> } = {
  // build: () => Promise.resolve(require('../cli/base-build').baseBuild),
  dev: () => Promise.resolve(require('../cli/base-dev').baseDev)
}

const args = arg(
  {
    // Types
    '--version': Boolean,
    '--help': Boolean,
    '--inspect': Boolean,

    // Aliases
    '-v': '--version',
    '-h': '--help',
  },
  {
    permissive: true,
  }
)

const foundCommand = Boolean(commands[args._[0]])

const command = foundCommand ? args._[0] : defaultCommand
const forwardedArgs = foundCommand ? args._.slice(1) : args._

process.on('SIGTERM', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))

commands[command]()
  .then((exec) => exec(forwardedArgs))