import execa from 'execa'
import ora from 'ora'
import { execCommands } from './exec'
import queryInfo, { QueryInfo } from './queryInfo'
import pEachSeries from 'p-each-series'

const packageJson = require(`${process.cwd()}/package.json`)
const start = process.argv.includes('start')
const stop = process.argv.includes('stop')

const linkNpm = async (info: QueryInfo): Promise<void> => {
  await execCommands({
    commands: [
      {
        cwd: info.cwd,
        cmd: 'npm',
        args: ['link']
      }
    ],
    info: 'Link NPM library module'
  })
  await execCommands({
    commands: [
      {
        cwd: info.project_cwd,
        cmd: 'npm',
        args: ['link', info.name]
      }
    ],
    info: 'Link library in Main Project folder'
  })
  await linkPeers(packageJson.peerDependencies, info)
}

const unLinkNpm = async (info: QueryInfo): Promise<void> => {
  await execCommands({
    commands: [
      {
        cwd: info.project_cwd,
        cmd: 'npm',
        args: ['unlink', info.name]
      }
    ],
    info: 'Unlink library in Main Project folder'
  })
  await execCommands({
    commands: [
      {
        cwd: info.cwd,
        cmd: 'npm',
        args: ['unlink']
      }
    ],
    info: 'Unlink NPM library module'
  })
  await execCommands({
    commands: [
      {
        cwd: info.project_cwd,
        cmd: 'npm',
        args: ['install']
      }
    ],
    info: 'Reinstall packages in Main Project folder'
  })
  await unLinkPeers(packageJson.peerDependencies, info)
}

const linkPeers = async (
  peerDependencies: Record<string, string> = {},
  info: QueryInfo
) => {
  const peers = Object.keys(peerDependencies)
  if (peers.length && info.project_cwd?.length) {
    const project_path = info.project_cwd.endsWith('/')
      ? info.project_cwd
      : info.project_cwd + '/'

    await pEachSeries(peers, async (peer) => {
      const peerLinkPath = project_path + 'node_modules/' + peer
      return execCommands({
        commands: [
          {
            cwd: info.cwd,
            cmd: 'npm',
            args: ['install', peerLinkPath]
          }
        ],
        info: 'Install peer from Main Project: ' + peerLinkPath
      })
    })
  }
}

const unLinkPeers = async (
  peerDependencies: Record<string, string> = {},
  info: QueryInfo
) => {
  const peers = Object.keys(peerDependencies)
  if (peers.length && info.project_cwd?.length) {
    await execCommands({
      commands: [
        {
          cwd: info.cwd,
          cmd: 'npm',
          args: ['run', 'install-peers']
        }
      ],
      info: 'Reinstall peers in Library'
    })
  }
}

const startBundleWatch = async (info: QueryInfo) => {
  if (info?.start) {
    const text = ora('Completed ! Then it will start your bundle watch! ')
    text.succeed()
    execa('npm', ['run', info.start], {
      cwd: info.cwd
    }).stdout?.pipe(process.stdout)
  }
}

const app = async () => {
  const info = await queryInfo()
  if (!stop) {
    await linkNpm(info)
    await startBundleWatch(info)
  } else {
    await unLinkNpm(info)
    const text = ora(
      'Completed ! You can now continue your local package development! '
    )
    text.succeed()
  }
}

app()
