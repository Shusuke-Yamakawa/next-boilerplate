import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="flex flex-col text-center">
      <Link href="lib/dnd" className="text-blue-400">
        dndへ
      </Link>
      <Link href="lib/mantine" className="text-blue-400">
        mantineへ
      </Link>
      <Link href="lib/dnd" className="text-blue-400">
        dndへ
      </Link>
      <Link href="lib/dndStart" className="text-blue-400">
        dndStartへ
      </Link>
    </div>
  )
}
