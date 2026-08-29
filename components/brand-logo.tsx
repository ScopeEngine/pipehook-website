import Image from 'next/image'

type BrandLogoProps = {
  href?: string
  priority?: boolean
}

export function BrandLogo({ href = '#top', priority = false }: BrandLogoProps) {
  return (
    <a className="logo" href={href} aria-label="PipeHook">
      <Image src="/pipehook-logo.png" alt="PipeHook" width={180} height={36} priority={priority} />
    </a>
  )
}
