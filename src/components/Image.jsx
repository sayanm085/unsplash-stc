import { useImageLazyLoad } from '../utils';
import { resizedHeight } from '../utils/masonry.js';
import { Blurhash } from 'react-blurhash';
import { useModal } from './useModal.jsx';

import { CreditsImage } from './Credits.jsx';
import Vignette from './Vignette.jsx';

import ErrorBoundary from './ErrorBoundaryImage.jsx';

export function Image({ image, IMAGE_WIDTH }) {
	const [isVisible, imageRef] = useImageLazyLoad();
	const modal = useModal();

	return (
		<div
			className="image"
			ref={imageRef}
			style={{
				position: 'relative',
				height: resizedHeight(image.width, image.height, IMAGE_WIDTH),
				cursor: 'zoom-in',
			}}
			onClick={() => {
				modal.showImage(image);
			}}
		>
			<Vignette>{<CreditsImage image={image} />}</Vignette>
			{isVisible && (
				<img
					src={image.urls.raw + '&w=416'}
					className="unsplashImage"
					style={{
						maxWidth: IMAGE_WIDTH,
						position: 'absolute',
						top: 0,
						left: 0,
						zIndex: 5,
					}}
					alt={image.description || image.alt_description}
				/>
			)}

			<ErrorBoundary>
				{image.blur_hash !== null && (
					<Blurhash
						alt={image.description || image.alt_description}
						hash={image.blur_hash}
						className="unsplashImage blurHash"
						style={{
							width: '100%',
							maxWidth: IMAGE_WIDTH,
							position: 'absolute',
							left: 0,
							top: 0,
							zIndex: 2,
						}}
						height={resizedHeight(image.width, image.height, IMAGE_WIDTH)}
						resolutionX={32}
						resolutionY={32}
						punch={1}
					/>
				)}
			</ErrorBoundary>
		</div>
	);
}
