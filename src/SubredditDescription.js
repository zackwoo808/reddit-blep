import React from 'react';
import PropTypes from 'prop-types';
import './SubredditDescription.css';

function SubredditDescription({ subreddit }) {
	switch(subreddit) {
		case 'blep': {
			return(<p className="description">"blep" (noun) - cats with their tongue out</p>);
		}
		case 'blop': {
			return(<p className="description">"blop" (noun) - dogs with their tongue out</p>);
		}
		case 'blup': {
			return(<p className="description">"blup" (noun) - all which is not blep nor blop.</p>);
		}
		default:
			return(<p>no subreddit</p>);
	}
}

SubredditDescription.propTypes = {
	subreddit: PropTypes.string.isRequired
}

export default SubredditDescription;