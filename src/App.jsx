import { PresentationShell } from './components/PresentationShell.jsx'
import CoverSlide from './slides/CoverSlide.jsx'
import WhoWeAreSlide from './slides/WhoWeAreSlide.jsx'
// How We Work is temporarily disabled — re-add its entry below (between
// Who We Are and Services, its original position) to bring it back.
// import HowWeWorkSlide from './slides/HowWeWorkSlide.jsx'
import WaysToWorkSlide from './slides/WaysToWorkSlide.jsx'
import ServicesSlide from './slides/ServicesSlide.jsx'
import SelectedWorkSlide from './slides/SelectedWorkSlide.jsx'
import CTASlide from './slides/CTASlide.jsx'

const slides = [
  { id: 'cover', title: 'Cover', Component: CoverSlide },
  { id: 'who-we-are', title: 'Who We Are', Component: WhoWeAreSlide },
  // { id: 'how-we-work', title: 'How We Work', Component: HowWeWorkSlide },
  { id: 'services', title: 'Services', Component: ServicesSlide },
  { id: 'selected-work', title: 'Selected Work', Component: SelectedWorkSlide },
  { id: 'ways-to-work', title: 'Ways to Work', Component: WaysToWorkSlide },
  { id: 'lets-talk', title: "Let's Talk", Component: CTASlide },
]

export default function App() {
  return <PresentationShell slides={slides} />
}
