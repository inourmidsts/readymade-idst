import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { FacebookProvider, Like } from 'react-facebook'
import Chip from '@material-ui/core/Chip'

import { css } from 'emotion'


const paragraph__chipstyle = paragraph + "--chipstyle";
const paragraph__fbooklikes = paragraph + "--fbooklikes";

const paragraph = css`
          padding: 0 20px 20px;
          max-width: 240px;
          border-left: 2px solid black;

        h4 {
          font-family: "Permanent Marker";
          color: white;
          font-size: 1.8em;
        }
        
        
        &--fbooklikes {
          padding:20px;
          margin-top: 20px;
          border-top: 2px white solid;
          color: white;
          overflow : auto;
          display: inline-block;
          background-color: red !important;

          & span {
            color: white;
          }
        }
        &--chipstyle {
          margin-right: 5px;
          margin-bottom: 5px;
        }
      `;
    
const TagList = () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressTag {
            edges {
              node {
                id
                name
                link
                slug
              }
            }
          }
         allWordpressCategory {
          edges {
            node {
              id
              name
              link
              slug
            }
          }
      }
    }
    `}
    render={
      data => (
        
      <div className={paragraph}>
      
        
      <h4>Tags</h4>
                {data.allWordpressTag.edges.map(({ node: tag }) =>
                    <span key={tag.id}>

                                <Chip 
        className={paragraph__chipstyle}
        label={tag.name}
        component="a"
        href={`/tags/${tag.slug}/`}
        clickable
      />            

      
      </span>
                )}
      <h4>Categories</h4>

      {data.allWordpressCategory.edges.map(({ node: tag }) =>
                    <span key={tag.id}>
      <Chip 
        className={paragraph__chipstyle}
        label={tag.name}
        component="a"
        href={`/categories/${tag.slug}/`}
        clickable
      />  
      </span>
                )}
      <div className={paragraph__fbooklikes}>
      <FacebookProvider appId="555701548185468">
      <Like href="http://www.facebook.com/inourmidsts" colorScheme="dark" shares width="140px"/>
        </FacebookProvider>
        </div>           
      </div>
    )}
  />
)

export default TagList
