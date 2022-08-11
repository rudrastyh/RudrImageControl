const { Button, Spinner, BaseControl } = window.wp.components
const { MediaUpload, MediaUploadCheck } = window.wp.blockEditor
const { useSelect, useDispatch } = window.wp.data

const RudrImageControl = ( props ) => {

	const { imageId, image } = useSelect( select => {

		const id = select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ props.metaKey ];

		return {
			imageId: id,
			image: select( 'core' ).getMedia( id ),
		}
	})

	const { editPost } = useDispatch( 'core/editor', [ imageId ] )

	return(
		<BaseControl id={ props.metaKey } label={ props.label }>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ ( media ) => editPost( { meta: { [props.metaKey]: media.id } } ) }
					allowedTypes={ [ 'image' ] }
					value={ imageId }
					render={ ( { open } ) => (
						<div>
							{ ! imageId && <Button variant="secondary" onClick={ open }>Upload image</Button> }
							{ !! imageId && ! image &&
								<Spinner />
							}
							{ !! image && image &&
								<Button variant="link" onClick={ open }>
									<img src={ image.source_url } />
								</Button>
							}
						</div>
					) }
				/>
			</MediaUploadCheck>
			{ !! imageId &&
				<Button onClick={ () => editPost( { meta: { [props.metaKey]: null } } ) } isLink isDestructive>
					Remove image
				</Button>
			}
		</BaseControl>
	)
}

export default RudrImageControl
