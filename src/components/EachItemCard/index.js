import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {IoTrendingUpSharp} from 'react-icons/io5'
import {PiSubtitlesFill} from 'react-icons/pi'
import './index.css'

class EachItemCard extends Component {
  onClickGenEach = () => {
    const {eachData, onClickGenrateBtn} = this.props
    const {id} = eachData
    onClickGenrateBtn(id)
    console.log('Clicked')
  }

  render() {
    const {eachData} = this.props
    return (
      <>
        <div className="each-card">
          <div className="head-star">
            <h4 className="para-name">{eachData.headline}</h4>
            <p className="row-wise rating-para ">
              4.1 <FaStar className="start-icon" />{' '}
            </p>
          </div>
          <p className="para-new-name">
            {' '}
            <PiSubtitlesFill className="name-icon" /> {eachData.name}
          </p>
          <p className="location">
            {' '}
            <MdLocationOn /> {eachData.location}
          </p>
          <div className="head-star">
            <p
              className={`reviews ${eachData.reviews > 100 ? 'green' : 'red'} `}
            >
              {' '}
              Reviews {eachData.reviews} <IoTrendingUpSharp />
            </p>
            <button
              type="button"
              className="regenrate"
              onClick={this.onClickGenEach}
            >
              Regenrate
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default EachItemCard
