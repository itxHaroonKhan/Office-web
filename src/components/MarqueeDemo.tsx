import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"

const reviews = [
  {
    name: "Sarah Johnson",
    username: "CEO at TechStart",
    body: "Digital Spark Web transformed our online presence. Their web design team is incredibly talented and professional.",
    img: "/user1.webp",
  },
  {
    name: "Michael Davis",
    username: "Marketing Director",
    body: "Working with them was the best decision for our brand. Attention to detail and quality is truly unmatched.",
    img: "/user2.webp",
  },
  {
    name: "Jennifer Williams",
    username: "Project Manager",
    body: "Compelling visuals and robust code. They understood our vision perfectly from day one and delivered on time.",
    img: "/user3.webp",
  },
  {
    name: "Robert Brown",
    username: "Founder, Brown Ent.",
    body: "Outstanding work on our branding! They delivered an identity that truly represents who we are as a company.",
    img: "/user1.webp",
  },
  {
    name: "Emily Clark",
    username: "Head of Design",
    body: "The team's creativity and professionalism exceeded all our expectations. Highly recommend Digital Spark Web.",
    img: "/user2.webp",
  },
  {
    name: "David Wilson",
    username: "CTO at InnovateCo",
    body: "From concept to launch, they delivered everything on time and beyond quality standards. A truly exceptional team.",
    img: "/user3.webp",
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
  key?: string | number
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-zinc-950/[.1] bg-primary/5 hover:bg-primary/10 transition-colors",
        "dark:border-zinc-50/[.1] dark:bg-zinc-50/[.10] dark:hover:bg-zinc-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full object-cover" width="32" height="32" alt={name} src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#0a0b1e]"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0a0b1e]"></div>
    </div>
  )
}
