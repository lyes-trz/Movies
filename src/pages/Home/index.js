import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'
import Home from './Home'

const mapStateToProps = state => ({
    base: state.base,
})

const mapDispatchToProps = dispatch => ({
    getServiceData: bindActionCreators(actions.getServiceData, dispatch),
    getServiceCategories: bindActionCreators(actions.getServiceCategories, dispatch),
    setView: bindActionCreators(actions.setView, dispatch),
})

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeContainer