import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EditPost from '../EditPost/EditPost'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


class Post extends Component {
  state = {
    editing: false,
    liked: false
  }

  toggleEditing = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }

  likePost = (post) => {
    this.setState(prevState => ({ liked: !prevState.liked }))
    this.props.likePost(post)
  }

  savePost = (post) => {
    this.props.editPost(post)
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }

  render () {
    const { classes } = this.props;
    return (
      !this.state.editing ? (
        <div className={`card-item ${this.state.liked ? 'liked' : ''}`} key={this.props.post.pkey}>
          <div className='padding-30'>
            <div className='heart' onClick={() => {this.likePost(this.props.post)}}></div>
            <h2 className="margin-top-0">{this.props.post.title}</h2>
            <Grid container spacing={12}>
              <Grid item md={7}><p><pre style={{whiteSpace: "pre-wrap", padding: "10px"}}>{this.props.post.content}</pre></p></Grid>
              <Grid item md={5}>
                <Card>
                  <CardContent>
                    <img style={{maxWidth: "800px"}} src={this.props.post.url}/>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
          <div className='padding-30 card-footer grid-3'>
            <div className='detailAvatar'><b>{this.props.post.donationacc}</b> (Author: {this.props.post.author})</div>
            <div className='detailHeart'>{this.props.post.likes} (Funds required: {this.props.post.threshold} EOS)</div>
            <div className="detailTag">{this.props.post.tag}</div>
          </div>
          <div className='padding-30 grid-2'>
            <div onClick={() => {this.props.deletePost(this.props.post)}} className='iconDelete'></div>
            <div onClick={this.toggleEditing} className='iconEdit'></div>
          </div>
        </div>
      ) : (
        <EditPost savePost={this.savePost} post={this.props.post} toggleEditing={this.toggleEditing} />
      )
    )
  }
}
Post.displayName = 'Post' // Tell React Dev Tools the component name

// Assign Prop Types
Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired
    }),
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    threshold: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired
  }).isRequired,
  editPost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

export default withStyles(styles)(Post)
