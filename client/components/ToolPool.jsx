import React from 'react'
import { connect } from 'react-redux'
import ItemOnToolPool from './ItemOnToolPool'

import { nameSort } from '../utils/sorting'

export class ToolPool extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      term: '',
      results: props.gear,
      filter: 'AVAILABLE',
      viewingFilter: false,
      viewingSearch: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    this.runSearch = this.runSearch.bind(this)
    this.cancelSearch = this.cancelSearch.bind(this)
    this.selectSearch = this.selectSearch.bind(this)
    this.selectFilter = this.selectFilter.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.gear.length != prevProps.gear.length) {
      this.resetSearch()
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, this.handleSubmit)
  }

  handleSubmit() {
    (this.state.term === '')
      ? this.resetSearch()
      : this.runSearch()
  }

  resetSearch() {
    this.setState({
      results: this.props.gear,
    })
  }

  runSearch() {
    this.setState({
      results: this.props.gear.filter(item => {
        const fullText = item.name + ' ' + item.description
        const regex = new RegExp(this.state.term, 'i')
        return fullText.match(regex)
      })
    })
  }


  cancelSearch() {
    this.setState({
      term: ''
    })
    this.resetSearch()
  }

  selectSearch() {
    this.setState({
      viewingSearch: true,
      viewingFilter: false
    })
  }

  selectFilter() {
    this.setState({
      viewingSearch: false,
      viewingFilter: true
    })
  }

  render() {

    // to wait on gear array & user info load:
    if (this.props.isFetching) {
      return (
        <p>Fetching...</p>
      )
    }

    // once loaded:
    else {
      let display = (this.state.filter === 'AVAILABLE')
        ? this.state.results.filter(e => e.status === 'Available')
        : this.state.results

      return (
        <div className='section'>
        <div className="container">
          <div className='columns is-multiline'>
            <div className='column is-4 is-offset-4 has-text-centered'>
              <h1 className='title is-1'>All The Goodies</h1>
              {this.props.err && <span className="has-text-danger is-large">{this.props.err}</span>}
            </div>

            <div className='column is-4'>

              <div className="tabs is-boxed is-right profile-tab">
                <ul>
                  <li className={`${this.state.viewingFilter && 'is-active'}`}
                    onClick={() => this.selectFilter()}>
                    <a>Filter</a>
                  </li>
                  <li className={`${this.state.viewingSearch && 'is-active'}`}
                    onClick={() => this.selectSearch()}>
                    <a>Search</a>
                  </li>
                </ul>
              </div>

              {this.state.viewingSearch
                ?
                <div className='columns'>
                  <div className='column is-9'>
                    <input className='input is-normal' onChange={this.handleChange} type="text" placeholder='Search here...' value={this.state.term} name='term' />
                  </div>
                  <div className='column is-3'>
                    <button className='button is-pulled-right' onClick={this.cancelSearch}>See All</button>
                  </div>
                </div>
                :
                <div className='columns'>
                  <div className='column is-4'>
                    <span>Filter by: </span>
                  </div>
                  <div className='column is-8'>
                    <div className='select is-fullwidth'>
                      <select onChange={this.handleChange} name="filter">
                        <option className='option' value='AVAILABLE'>Available Now</option>
                        <option className='option' value='ALL'>All Tools</option>
                      </select>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <div className='columns is-multiline'>
            {display
              .sort(nameSort)
              .map(item => {
                return <ItemOnToolPool item={item} key={item.id} />
              })}
          </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  gear: state.gear.gear,
  err: state.gear.errorMessage,
  isFetching: state.gear.isFetching
})

export default connect(mapStateToProps)(ToolPool)
