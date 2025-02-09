/* eslint-env node */
// Style imports
import '../scss/reset.scss'
import '../scss/lib.scss'
import '../scss/app.scss'





// Module imports
import { AnimatePresence } from 'framer-motion'
import { ColorModeContextProvider } from 'react-color-mode'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'





// Local imports
import { BackgroundCarousel } from '../components/BackgroundCarousel/BackgroundCarousel.jsx'
import { Banner } from '../components/Banner/Banner.jsx'
import { PageWrapper } from '../components/PageWrapper/PageWrapper.jsx'
import { useNProgress } from '../hooks/useNProgress.js'





fontAwesomeConfig.autoAddCss = false

/**
 * Scrolls to the top of the page if possible.
 */
function handleExitComplete() {
	if (typeof window !== 'undefined') {
		window.scrollTo({ top: 0 })
	}
}

/**
 * Renders the global site components.
 *
 * @component
 */
export default function App(props) {
	const {
		Component,
		pageProps,
	} = props
	const router = useRouter()

	useNProgress()

	return (
		<>
			<BackgroundCarousel />

			<ColorModeContextProvider>
				<Banner />

				<AnimatePresence
					exitBeforeEnter
					onExitComplete={handleExitComplete}>
					<PageWrapper
						showPageTitle={Component.showPageTitle}
						structure={Component.structure}
						title={Component.title}>
						<Component
							key={router.route}
							{...pageProps} />
					</PageWrapper>
				</AnimatePresence>
			</ColorModeContextProvider>
		</>
	)
}

App.defaultProps = {
	pageProps: {},
}

App.propTypes = {
	Component: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.node,
	]).isRequired,
	pageProps: PropTypes.object,
}
