import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
import DocumentTitle from 'react-document-title';

function Button(props) {
  return(
    <span>
      <button
        onClick={() => props.onClick()}
        className="subredditButton"
      >
        {props.value}
      </button>
    </span>
  );
}

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
    if (subreddit) {
      axios.get(`https://www.reddit.com/r/${subreddit}.json`).then(res => {
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
      <DocumentTitle title={this.state.currentSubreddit}>
        <div className="App">
          <div className="photos">
            <img 
              src={require('./images/woodsy.jpeg')}
              alt="Woodsy"
              height="150"
              width="200"
              className="photo"
            />
            <p className="photoDescription">Woodsy is not pleased</p>
          </div>
          <div>
            <h1>
              /r/bl<div className='subredditHeader'>{this.state.currentSubreddit.charAt(2)}</div>p
            </h1>
          </div>
          <div>
            <Button onClick={() => this.handleClick('blep')} value='blep' />
            <Button onClick={() => this.handleClick('blop')} value='blop' />
            <Button onClick={() => this.handleClick('blup')} value='blup' />
          </div>
          <div>
            <ul>
              {this.state.posts.map(post => (
                <li id="listItem" key={post.id}>
                  <p>
                    <a
                      href={post.url}
                      rel="noopener noreferrer"
                      target="_blank">{post.title}
                    </a>
                    <br />
                    by <b>{post.author}</b>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

// ======================================================

ReactDOM.render(<Reddit />, document.getElementById("root"));

