var supportersRandomiser = function () {
( (/** @type {HTMLElement} */ root ) => {
	let current = root;
	const list = [];
	while ( current.nextElementSibling )
	{
		current = current.nextElementSibling;
		if (
			current.nodeName === 'DIV'
			&& current.firstElementChild
			&& current.firstElementChild.nodeName === 'DIV'
			&& current.firstElementChild.firstElementChild
			&& current.firstElementChild.firstElementChild.nodeName === 'P'
		)
		{
			list.push( current.firstElementChild );
			list.push( current.firstElementChild.nextElementSibling );
		}
		else {
			break;
		}
	}
	for ( let i = list.length - 1; i > 0; i-- )
	{
		const j = Math.floor( Math.random() * ( i + 1 ) );
		[ list[ i ], list[ j ] ] = [ list[ j ], list[ i ] ]; // eslint-disable-line no-param-reassign
	}

	list2 = [];
	let row = null;
	for ( let i = 0; i < list.length; i++ )
	{
		if ( (i % 2) == 0 ) {
			row = document.createElement( 'div' );
			row.classList.add('row');
			row.appendChild(list[i]);
		} else {
			row.appendChild(list[i]);
			list2.push(row);
			row = null;
		}
	}
	if (row) {
		list2.push(row);
	}

	root.parentNode.insertBefore( document.createElement( 'div' ), root.nextSibling );
	list2.forEach( (/** @type {HTMLElement} */ item ) => {
		root.nextElementSibling.appendChild( item );
	} );
} )( document.getElementById( 'do-not-translate-randomize-this-section' ) );
};
