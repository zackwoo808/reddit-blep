import axios from "axios";
import Button from './Button.js';
import Post from './Post.js';
import React from "react";
import ReactDOM from "react-dom";
import SubredditDescription from './SubredditDescription.js';
import "./index.css";
import * as serviceWorker from './serviceWorker';

// ================================================================

class Reddit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentSubreddit: 'blep',
    };
  }

  componentDidMount() {
    axios.get(`https://www.reddit.com/r/${this.state.currentSubreddit}.json`).then(res => {
      const posts = res.data.data.children.map(obj => obj.data);
      this.setState({ posts });
    });
  };

  handleClick(subreddit) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();


    if (subreddit) {
      axios.get(`https://www.reddit.com/r/${subreddit}.json`, {
        cancelToken: source.token
      }).then(res => {
          const posts = res.data.data.children.map(obj => obj.data);
          this.setState({ posts });
      });
      this.setState({
        currentSubreddit: subreddit
      });
    }
  };
  
  render() {
    return (
      <div className="App">
        <div>
          <h1 className='subredditHeader'>
            /r/bl<div className='subredditHeaderChar'>{this.state.currentSubreddit.charAt(2)}</div>p
          </h1>
        </div>
        <SubredditDescription subreddit={this.state.currentSubreddit} />
        <div>
          <Button onClick={() => this.handleClick('blep')} value='blep' />
          <Button onClick={() => this.handleClick('blop')} value='blop' />
          <Button onClick={() => this.handleClick('blup')} value='blup' />
        </div>
        <div>
          <ul>
            {this.state.currentSubreddit === "blep" ?
              <li id="listItem">
                  <img 
                    src={require('./images/woodsy.jpeg')}
                    alt="Woodsy"
                    height="300"
                    width="300"
                    className="photo"
                  />
                  <p className="photoDescription"><b>Blep do not please Woodsy</b></p>
              </li>
              : null
            }
            {this.state.posts.map(post => (
              <li id="listItem" key={post.id}>
                <Post
                  postUrl={post.url}
                  postAuthor={post.author}
                  postTitle={post.title}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

// ======================================================

ReactDOM.render(<Reddit />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
