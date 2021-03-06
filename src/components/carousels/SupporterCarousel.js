import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Carousel from 'nuka-carousel'


const SupporterCarousel = () => (
  <StaticQuery
    query={graphql`
      query {
        wordpressWpApiMenusMenusItems(slug: { eq: "main-nav" }) {
          items {
            title
            object_slug
            url
          }
        }
        allWordpressPage(sort: { fields: wordpress_id }, limit: 5) {
          edges {
            node {
              title
              slug
              
            }
          }
        }
        allWordpressWpSupporters(sort: { fields: wordpress_id }, limit: 99) {
          edges { 
            node {
              id
              title
              acf {
                link
                frontimage {
                    id
                    link
                    caption
                    source_url
                    title
                          }
                  }
                }
          }  
        }      
      }
    `}
    render={data => (
    
      <Carousel slidesToShow={3} autoplay={true} autoplayInterval={9000} wrapAround={true}>
      {data.allWordpressWpSupporters.edges.map(edge => (
          <div key={edge.node.id}>
          <Link to={edge.node.acf.link} style={{
            color: '#000',
            marginRight: '2em',
          }}>
          <img key={edge.node.acf.frontimage.id} src={`${edge.node.acf.frontimage.source_url}`} alt={`${edge.node.title}`}/>
          <h1>{edge.node.title}</h1>
          
          </Link>
          </div>
        ))}
      </Carousel>
      
    )}
  />
)

export default SupporterCarousel
