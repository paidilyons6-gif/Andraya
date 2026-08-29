import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, Flip)

export { DrawSVGPlugin, Flip, gsap, ScrollTrigger, SplitText }
