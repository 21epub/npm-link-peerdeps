#!/usr/bin/env node

import execa from 'execa'
import ora from 'ora'
import { execCommands } from './exec'
import queryInfo, { QueryInfo } from './queryInfo'

const packageJson = require(`${process.cwd()}/package.json`)
const stop = process.argv.includes('stop')

const linkNpm = async (info: QueryInfo): Promise<void> => {
  // remove peers from library
  await linkPeers(packageJson.peerDependencies, info)
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
        cwd: info.projectCwd,
        cmd: 'npm',
        args: ['install', info.cwd, '--no-save']
      }
    ],
    info: 'Install library to Main Project folder'
  })
  await execCommands({
    commands: [
      {
        cwd: info.projectCwd,
        cmd: 'npm',
        args: ['link', info.name]
      }
    ],
    info: 'Link library in Main Project folder'
  })
}

const unLinkNpm = async (info: QueryInfo): Promise<void> => {
  await execCommands({
    commands: [
      {
        cwd: info.projectCwd,
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
        cwd: info.projectCwd,
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
  if (peers.length && info.projectCwd?.length) {
    const projectPath = info.projectCwd.endsWith('/')
      ? info.projectCwd
      : info.projectCwd + '/'

    for (const peer of peers) {
      await execCommands({
        commands: [
          {
            cwd: info.cwd,
            cmd: 'rm',
            args: ['-fr', './node_modules/' + peer]
          }
        ],
        info: 'Rm peer from Library packages: ' + peer
      })
    }
  }
}

const unLinkPeers = async (
  peerDependencies: Record<string, string> = {},
  info: QueryInfo
) => {
  const peers = Object.keys(peerDependencies)
  if (peers.length && info.projectCwd?.length) {
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
    const { stdout } = execa('npm', ['run', info.start], {
      cwd: info.cwd
    })
    if (stdout) stdout.pipe(process.stdout)
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
