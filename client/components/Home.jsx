import React from 'react'
import { connect } from 'react-redux'

export class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }
  render() {
    return (

      <div className='homebody'>
        <div className="container">

          <div className="section">
           
            <h1 className='title is-1 has-text-right main-header'>Nuts & Bolts</h1>

          </div>

          <div className="section">
            <div className='columns'>
              <div className='column is-8'>
              </div>
              <div className='column is-4 has-text-right'>
                <h4 className='title is-4'>A community for peer-to-peer lending of tools and household appliances.</h4>
                <p >Keen for some trust-based sharing of handy things? It removes the need to buy new junk for odd jobs and allows everyone to get more use out of their stuff instead of it just gathering dust. </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({ gear: state.gear.gear, err: state.gear.errorMessage })

export default connect(mapStateToProps)(Home)
