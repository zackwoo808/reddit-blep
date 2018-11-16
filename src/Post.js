import React from 'react';
import PropTypes from 'prop-types';

function Post({ postUrl, postAuthor, postTitle }) {
	let badTitle = "Please keep rule 1 in mind: NO DOGS";

	if (postTitle !== badTitle) {
		return(
			<p>
				<img
					src={
					 postUrl.includes("https://imgur.com") ?
					 `https://i.imgur.com/${postUrl.substr(17)}.jpg` : //extract imgur image source
					 postUrl
					}
					height="200"
					width="200"
					alt="click link for cuteness"
					className="photo"
				/>
				<br />
				<a
					href={postUrl}
					rel="noopener noreferrer"
					target="_blank">
					{postTitle}
				</a>
				<br />
				by <b>{postAuthor}</b>
			</p>
		);
	}
	
	return null;
}

Post.propTypes = {
	postUrl: PropTypes.string.isRequired,
	postAuthor: PropTypes.string.isRequired,
	postTitle: PropTypes.string.isRequired
}

export default Post;