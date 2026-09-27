import { cn } from '../../utils/cn'

const palette = [
  'bg-primary-100 text-primary-700',
  'bg-accent-teal/20 text-accent-teal',
  'bg-accent-pink/20 text-accent-pink',
  'bg-accent-orange/20 text-accent-orange',
]

function initials(name = '') {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Avatar({ name, src, size = 'md', className }) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base',
  }
  const colorIndex = name ? name.charCodeAt(0) % palette.length : 0

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn('rounded-full object-cover object-top', sizes[size], className)}
      />
    )
  }

  return (
    <span
      role="img"
      aria-label={name}
      className={cn(
        'flex items-center justify-center rounded-full font-semibold',
        sizes[size],
        palette[colorIndex],
        className,
      )}
    >
      {initials(name)}
    </span>
  )
}
