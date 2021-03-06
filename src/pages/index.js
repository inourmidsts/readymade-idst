import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import IndexLayout from '../components/layout/IndexLayout'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
//import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from "../components/utilities/button"

import styled, { css } from 'react-emotion'

export default class IndexPage extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { data } = this.props
    const { edges: posts } = data.allWordpressPost
    const { expanded } = this.state
    
    console.table(data.allWordpressPost)

    const StyledButton = styled(ExpandMoreIcon)`
  color: red;
  background-color: red;
  fill: #373142;
  max-width: 30px;
  max-height: 30px;
`;

const ArrowButton = styled(ArrowForwardIcon)`
  color: red;
  background-color: red;
  fill: #373142;
  max-width: 30px;
  max-height: 30px;
`;

    return (
  <IndexLayout>
          <div
  className={css`
    grid-column: 1 / 4;
    font-family: 'Permanent Marker';

    .buttonfooter {
      margin-top: 40px;
    }
  `}>
            {posts.map(({ node: post }) => (
              
              <div key={post.id}>
    
              <ExpansionPanel expanded={expanded === `${post.id}`} onChange={this.handleChange(`${post.id}`)} style={{backgroundImage: `url("${post.acf.frontimage.localFile.childImageSharp.resize.src}")`, backgroundSize: `cover`}}>
              
              <ExpansionPanelSummary expandIcon={<StyledButton style={{ maxWidth: '30px', maxHeight: '30px', fill: '#373142' }} />}>
              
                
              <div>  
              <h1>
                  <Link to={post.slug}>
                    <span className="" dangerouslySetInnerHTML={{ __html: post.title }}></span> 
                  </Link>
                </h1>
                
                {post.acf.finishingdate && post.acf.finishingdate.length ? (
             <p className="" dangerouslySetInnerHTML={{ __html: post.acf.finishingdate }}></p> 
                
              ) : ''}
                </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
            
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.replace(/<p class="link-more.*/, ''),
                    }}
                  />
                  
                  <div className="buttonfooter">
                  <Button large to={post.slug} icon={<ArrowButton />} ariaLabel={post.title}>
                      Read On
                  </Button>

                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              
              </div>
                  
            ))}
        </div>
      </IndexLayout>
    )

    
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allWordpressPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          id
          title
          excerpt
          author 
          date(formatString: "MMMM DD, YYYY")
          slug
          _links {
            wp_featuredmedia {
              href
            }
          }
          acf {
            finishingdate
            toolsrequired
            skilllevel
            location
            eventsummary
            entry
            entrylink
            facebookevent
            tagline
            organisers
            frontimage {
              caption
              title
              link
              localFile {
                childImageSharp {
                  resize(width: 600, height: 180) {
                    src
                  }
                }
              }
            }
          }
        }
      }
  }
    wordpressPost{
      id
      title
      excerpt
      author 
      date(formatString: "MMMM DD, YYYY")
      slug
      _links {
        wp_featuredmedia {
          href
        }
      }
      acf {
        tagline
        organisers
        frontimage {
          caption
          title
          link
          localFile {
            childImageSharp {
                resize(width: 180, height: 180) {
                  src
                }
            }
          }
        }
      }
    }
  }
`