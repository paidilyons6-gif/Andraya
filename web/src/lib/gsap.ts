import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText)

export { DrawSVGPlugin, gsap, ScrollTrigger, SplitText }
