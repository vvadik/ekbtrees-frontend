import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import Main from "../Main";
import Header from "../Header";
import { ICookieAccess, IUser} from "../../common/types";
import { IAppProps, IAppState } from "./types";


const cookies = new Cookies();

export default class App extends Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);

        this.state = {
            user: null,
        }
    }

    componentDidMount(){
        cookies.addChangeListener(this.handleCookie);
        this.handleCookie();
    }


    removeCookie = () => {
        cookies.remove('AccessToken');

        this.setState({
            user: null
        })
    }

    handleCookie = () => {
        const cookieAccess = cookies.get('AccessToken');

        if(cookieAccess) {
            const decodedCookie: ICookieAccess = jwt_decode(cookieAccess);
            const {id, email, firstName, lastName, roles} = decodedCookie;
            let user: IUser = {
                id: id,
                email: email,
                firstName: firstName,
                lastName: lastName,
                role: roles[0]
            };

            this.setState({
                user: user
            })
        }
    }

    render() {
        const {user} = this.state;

        return (
            <>
                <Header user={user} onCookieRemove={this.removeCookie} />
                <Main user={user} onCookie={this.handleCookie} />
            </>
        )
    }
}
