import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    teamMatchesData: [],
    recentMatchesData: [],
    bannerUrl: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatchesData()
  }

  getUpdatedMatchDetailsData = latestMatchDetails => {
    const updatedMatchDetailsData = {
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      date: latestMatchDetails.date,
      firstInnings: latestMatchDetails.first_innings,
      id: latestMatchDetails.id,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      matchStatus: latestMatchDetails.match_status,
      result: latestMatchDetails.result,
      secondInnings: latestMatchDetails.second_innings,
      umpires: latestMatchDetails.umpires,
      venue: latestMatchDetails.venue,
    }
    return updatedMatchDetailsData
  }

  getUpdatedRecentMatchesData = recentMatches => {
    const updatedRecentMatchesData = recentMatches.map(eachObject => ({
      competingTeam: eachObject.competing_team,
      competingTeamLogo: eachObject.competing_team_logo,
      date: eachObject.date,
      firstInnings: eachObject.first_innings,
      id: eachObject.id,
      manOfTheMatch: eachObject.man_of_the_match,
      matchStatus: eachObject.match_status,
      result: eachObject.result,
      secondInnings: eachObject.second_innings,
      umpires: eachObject.umpires,
      venue: eachObject.venue,
    }))
    return updatedRecentMatchesData
  }

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    // console.log(data)
    const updatedData = {
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
      teamBannerUrl: data.team_banner_url,
    }
    console.log(updatedData)
    const {latestMatchDetails, recentMatches, teamBannerUrl} = updatedData
    const updatedMatchDetailsData = this.getUpdatedMatchDetailsData(
      latestMatchDetails,
    )
    // console.log(updatedMatchDetailsData)
    const updatedRecentMatchesData = this.getUpdatedRecentMatchesData(
      recentMatches,
    )
    // console.log(updatedRecentMatchesData)
    this.setState({
      bannerUrl: teamBannerUrl,
      recentMatchesData: updatedRecentMatchesData,
      teamMatchesData: updatedMatchDetailsData,
      isLoading: false,
    })
  }

  renderTeamMatchesPage = () => {
    const {teamMatchesData, bannerUrl, recentMatchesData} = this.state
    console.log(teamMatchesData)
    console.log(bannerUrl)
    console.log(recentMatchesData)
    return (
      <div className="matches-container">
        <div className="team-banner-image">
          <img src={bannerUrl} alt="team banner" className="banner" />
        </div>
        <div className="latest-matches-container">
          <h1 className="latest-matches-heading">Latest Matches</h1>
          <LatestMatch teamMatchesData={teamMatchesData} />
        </div>
        <ul className="team-matches-details-container">
          {recentMatchesData.map(eachMatchDetails => (
            <MatchCard
              matchDetails={eachMatchDetails}
              key={eachMatchDetails.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatchesPage()}
      </div>
    )
  }
}

export default TeamMatches
