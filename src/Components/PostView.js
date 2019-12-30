import React, { Component } from 'react'

// const dummy_prop = {
//     title : '테스트용 타이틀입니다.',
//     content: '테스트용 글입니다.',
// }


export default class PostView extends Component {
    render() {
        const {id, title, content, date} = this.props
        return (
            <div>
                {id}
                <h2>{title}</h2>
                <p>{content}</p>
                <p>{date}</p>
            </div>
        )
    }
}
