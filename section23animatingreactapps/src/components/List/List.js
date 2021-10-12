import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
//TransitionGroup 을 통해 맨 아래의 List 컴포넌트도 애니메이션을 처리해보자
import CSSTransition from 'react-transition-group/CSSTransition';
//CSSTransition 를 통해 리스트의 개별처리를 해야 그룹의 애니메이션을 처리할 수 있다.

import './List.css';

class List extends Component {
    state = {
        items: [1, 2, 3]
    }

    addItemHandler = () => {
        this.setState((prevState) => {
            return {
                items: prevState.items.concat(prevState.items.length + 1)
            };
        });
    }

    removeItemHandler = (selIndex) => {
        this.setState((prevState) => {
            return {
                items: prevState.items.filter((item, index) => index !== selIndex)
            };
        });
    }

    //아래에서 CSSTransition 에서 동작시 만들어지는 css 클래스설정을 따로 해줘야 css가 동작한다.
    // (여기선 List.css 에서 .fade-enter, .fade-enter-active 등등 에서 처리했다.)
    render () {
        const listItems = this.state.items.map( (item, index) => (
            <CSSTransition key={index} classNames='fade' timeout={300}>
            <li 
                key={index}
                className="ListItem" 
                onClick={() => this.removeItemHandler(index)}>{item}</li>
            </CSSTransition>
        ) );

        return (
            <div>
                <button className="Button" onClick={this.addItemHandler}>Add Item</button>
                <p>Click Item to Remove.</p>
                {/* <ul className="List">
                    {listItems}
                </ul> */}
                {/* 전체적으로 그룹핑을 안하고 개별적인 CSSTransition 만 넣으면 CSS가 동작하지 않는다 */}
                <TransitionGroup component='ul' className="List">
                    {listItems}
                </TransitionGroup>
            </div>
        );
    }
}

export default List;