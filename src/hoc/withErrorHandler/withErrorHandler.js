import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Wrap from '../wrap/wrap';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        
        state={
            error: null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.respInterceptor = axios.interceptors.response.use(res => res, error =>{
                this.setState({error: error});
            })
        }
        
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);            
        }
        

        errorConfirmHandler = () => {
            this.setState({error: null});
        }

        render(){            
            return (
                <Wrap>
                    <Modal 
                    show={this.state.error}
                    modalClose={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Wrap>                
            );
        }
    }
}

export default withErrorHandler;