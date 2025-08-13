type Props = {
  src: string
  alt?: string
}

export function HeroPhotoFrame({ src, alt = 'Her photo' }: Props) {
  return (
    <div className="relative w-52 h-64 md:w-64 md:h-80 mx-auto">
      <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/20 to-white/5 blur-xl" />
      <div className="relative rounded-[22px] overflow-hidden border border-white/20 shadow-2xl group">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  )
}