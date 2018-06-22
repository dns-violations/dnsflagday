( (/** @type {HTMLElement} */ root ) => {
	let current = root;
	const list = [];
	while ( current.nextElementSibling )
	{
		current = current.nextElementSibling;
		if (
			current.nodeName === 'P'
			&& current.firstElementChild
			&& current.firstElementChild.nodeName === 'A'
			&& current.firstElementChild.firstElementChild
			&& current.firstElementChild.firstElementChild.nodeName === 'IMG'
		)
		{
			list.push( current );
		}
	}
	for ( let i = list.length - 1; i > 0; i-- )
	{
		const j = Math.floor( Math.random() * ( i + 1 ) );
		[ list[ i ], list[ j ] ] = [ list[ j ], list[ i ] ]; // eslint-disable-line no-param-reassign
	}
	root.parentNode.insertBefore( document.createElement( 'div' ), root.nextSibling );
	list.forEach( (/** @type {HTMLElement} */ item ) => {
		root.nextElementSibling.appendChild( item );
	} );
} )( document.getElementById( 'do-not-translate-randomize-this-section' ) );
