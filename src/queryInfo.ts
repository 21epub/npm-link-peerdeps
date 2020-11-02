import inquirer from 'inquirer'

const packageJson = require(`${process.cwd()}/package.json`)

export interface QueryInfo {
  name: string
  cwd: string
  project_cwd: string
  start?: string
}

export default async (): Promise<QueryInfo> => {
  const info = await inquirer.prompt([
    {
      type: 'input',
      name: 'project_cwd',
      message: 'Input the Path(cwd) of Main Project (e.g. /var/project ): ',
      validate: (project_cwd: string) => {
        return project_cwd?.length > 0
      }
    },
    {
      type: 'input',
      name: 'cwd',
      message:
        'Input the Path(cwd) of your NPM library  (current folder by default ): ',
      validate: (cwd: string) => {
        return cwd?.length > 0
      },
      default: process.cwd()
    },
    {
      type: 'input',
      name: 'name',
      message:
        'Input the Name of your NPM library  ( name in package.json by default): ',
      validate: (name: string) => {
        return name?.length > 0
      },
      default: packageJson?.name
    },
    {
      type: 'input',
      name: 'start',
      message:
        'Input your bundle watch script command (default is start-w for create-parcel-react-library ): ',
      default: 'start-w'
    }
  ])
  return info
}
