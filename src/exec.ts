import execa from 'execa'
import ora from 'ora'
import pEachSeries from 'p-each-series'

interface CommandOption {
  cwd: string
  cmd: string
  args: string[]
}

interface ExecOption {
  commands: CommandOption[]
  info: string
}
export const runCommands = async (opts: CommandOption[]) => {
  return pEachSeries(opts, async ({ cmd, args, cwd }: CommandOption) => {
    return execa(cmd, args, { cwd })
  })
}

export const execCommands = async (opts: ExecOption) => {
  const { commands, info } = opts
  const exec = runCommands(commands)
  ora.promise(exec, info)
  await exec
}
