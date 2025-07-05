import {TailSpin} from 'react-loader-spinner'
import {Component} from 'react'
import Header from '../Header'
import EachItemCard from '../EachItemCard'

import './index.css'

const businessInitialSetup = {
  failure: 'FAILURE',
  sucsess: 'SUCCESS',
  loading: 'LOADING',
  noSearches: 'NO_SEARCHES',
}

class BusinessComponent extends Component {
  state = {
    businessName: '',
    location: '',
    errorMsgStatus: false,
    displayCardDetailsData: [],
    businessStatus: businessInitialSetup.noSearches,
  }

  // componentDidMount() {
  //   this.getData()
  // }

  getData = async () => {
    const url = 'https://mini-business-backend.onrender.com/business-data'
    const response = await fetch(url)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        displayCardDetailsData: data,
        businessStatus: businessInitialSetup.sucsess,
      })
    } else {
      this.setState({businessStatus: businessInitialSetup.failure})
    }
  }

  onClickGenrateBtn = async id => {
    const {displayCardDetailsData} = this.state
    const headResponse = await fetch(
      `https://mini-business-backend.onrender.com/regenerate-headline/${id}`,
    )
    const headlineData = await headResponse.json()
    const updatedData = displayCardDetailsData.map(each => {
      if (id === each.id) {
        return headlineData
      }
      return each
    })
    this.setState({displayCardDetailsData: updatedData}, this.sucsessRender)
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {businessName, location} = this.state
    if (businessName === '' || location === '') {
      this.setState({errorMsgStatus: true})
    } else {
      this.setState(
        {businessStatus: businessInitialSetup.loading, errorMsgStatus: false},
        this.getData,
      )
    }
  }

  onChangeBusinnesName = event => {
    this.setState({businessName: event.target.value})
  }

  onChangeLocation = event => {
    this.setState({location: event.target.value})
  }

  sucsessRender = () => {
    const {displayCardDetailsData} = this.state
    return (
      <>
        <ul className="each-item-container">
          {displayCardDetailsData.map(each => (
            <EachItemCard
              eachData={each}
              key={each.id}
              onClickGenrateBtn={this.onClickGenrateBtn}
            />
          ))}
        </ul>
      </>
    )
  }

  noSearchesRender = () => (
    <div className="noSearches-container">
      <img
        src="https://i.postimg.cc/3YcTjSFz/11593386.jpg"
        className="no-search-results-img"
        alt="no-searches"
      />
    </div>
  )

  failureRender = () => (
    <div className="noSearches-container">
      <img
        src="https://imgs.search.brave.com/-sdpsDJQc4L8aJ4Qbq8inwgqD4gMhcZOHMujS3Rj9pI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM0/MjI5OTk5NS92ZWN0/b3IvZXJyb3Itb3It/d2FybmluZy1jb25j/ZXB0LmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz05R2hBOXQ3/SWl0ay1kQVhRdzc5/eTdLeVRfZTRxVEVn/RFFiSjVud0twd1pn/PQ"
        className="no-search-results-img"
        alt="no-searches"
      />
    </div>
  )

  loadingRender = () => (
    <div className="spinner-container">
      <TailSpin color="#0038a8" type="Tailspin" />
    </div>
  )

  defaultRenderFunciton = () => {
    const {errorMsgStatus} = this.state
    return (
      <div className="card-bg">
        <h1 className="welcome-header">Welcome to MiniBiz</h1>
        <div>
          <form onSubmit={this.onSubmitForm}>
            <div className="row-wise-inputs">
              <div className="column">
                <label htmlFor="business">Business Name</label>
                <input
                  type="text"
                  id="business"
                  placeholder="Enter"
                  className="text-input"
                  onChange={this.onChangeBusinnesName}
                />
              </div>
              <div className="column">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  placeholder="Enter"
                  className="text-input"
                  onChange={this.onChangeLocation}
                />
              </div>
            </div>
            <div className="btn-center">
              <button type="submit" className="btn">
                Submit
              </button>
              <p className="error-msg">{`${
                errorMsgStatus ? 'Enter valid inputs' : ''
              }`}</p>
            </div>
          </form>
        </div>
      </div>
    )
  }

  switchingFunction = () => {
    const {businessStatus} = this.state
    switch (businessStatus) {
      case businessInitialSetup.noSearches:
        return this.noSearchesRender()
      case businessInitialSetup.loading:
        return this.loadingRender()
      case businessInitialSetup.failure:
        return this.failureRender()
      case businessInitialSetup.sucsess:
        return this.sucsessRender()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="main-bg-container">
          <div className="card-bg-container">
            <Header />
            {this.defaultRenderFunciton()}
            {this.switchingFunction()}
          </div>
        </div>
      </>
    )
  }
}

export default BusinessComponent
