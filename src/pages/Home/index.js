import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as action from '../../action'
import Home from './Home'


const mapStateToProps = state => ({
    base: state.base,
})

const mapDispatchToProps = dispatch => ({
    getServiceData: bindActionCreators(action.getServiceData, dispatch),
    getServiceCategories: bindActionCreators(action.getServiceCategories, dispatch),
    setView: bindActionCreators(action.setView, dispatch),
})

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeContainer