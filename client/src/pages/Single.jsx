import React from "react";
import Menu from "../components/Menu";
import Edit from "../images/edit.png";
import Delete from "../images/delete.png";

const Single = () => {
    return (
        <div className="single">
            <div className="content">
                <img src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="image's article" />
                <div className="user">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="writer's article" />
                    <div className="info">
                        <span>John</span>
                        <p>Posted 2 days ago</p>
                    </div>
                    <div className="edit">
                        <img src={Edit} alt="" />
                        <img src={Delete} alt="" />
                    </div>
                </div>
                <h1>Lorem ipsum faucibus</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. 
                    Amet dictum sit amet justo donec. Egestas sed tempus urna et pharetra pharetra massa. 
                    Tincidunt lobortis feugiat vivamus at augue eget. Mauris nunc congue nisi vitae suscipit tellus mauris. 
                    Convallis aenean et tortor at risus viverra adipiscing. 
                    Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. 
                    Nisl suscipit adipiscing bibendum est. 
                    Rhoncus aenean vel elit scelerisque mauris. 
                    Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. 
                    Nunc eget lorem dolor sed viverra ipsum nunc aliquet. 
                    Volutpat commodo sed egestas egestas fringilla phasellus. 
                    Elementum nibh tellus molestie nunc non blandit massa enim. 
                    Sed augue lacus viverra vitae congue eu consequat. 
                    Sit amet luctus venenatis lectus magna fringilla urna. 
                    Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. 
                    Gravida dictum fus
                    ce ut placerat orci nulla. 
                    Faucibus in ornare quam viverra orci sagittis. 
                    Lectus sit amet est placerat in.

                    In vitae turpis massa sed elementum tempus egestas sed sed. 
                    Tellus integer feugiat scelerisque varius morbi enim nunc faucibus. 
                    Tempus egestas sed sed risus pretium quam vulputate dignissim. 
                    Auctor elit sed vulputate mi sit amet mauris commodo quis. 
                    Consectetur adipiscing elit duis tristique sollicitudin. 
                    Cursus euismod quis viverra nibh cras pulvinar mattis. 
                    Tincidunt vitae semper quis lectus nulla at volutpat. 
                    Ipsum consequat nisl vel pretium. Purus ut faucibus pulvinar elementum. 
                    Fringilla ut morbi tincidunt augue interdum velit euismod in. 
                    Adipiscing enim eu turpis egestas pretium aenean. 
                    Viverra maecenas accumsan lacus vel facilisis. 
                    Quis risus sed vulputate odio ut enim blandit volutpat. 
                    Eget nunc scelerisque viverra mauris. 
                    A iaculis at erat pellentesque adipiscing commodo. 
                    Et netus et malesuada fames ac turpis egestas. 
                    Vestibulum lorem sed risus ultricies tristique nulla. 
                    Adipiscing diam donec adipiscing tristique risus nec. 
                    Sed nisi lacus sed viverra tellus in hac habitasse. 
                    Purus faucibus ornare suspendisse sed.

                    Netus et malesuada fames ac. Dictum sit amet justo donec enim diam. 
                    Eu non diam phasellus vestibulum lorem sed risus. 
                    Dictum sit amet justo donec. Lacus luctus accumsan tortor posuere ac ut consequat. 
                    Elementum tempus egestas sed sed risus pretium quam vulputate. 
                    Eu augue ut lectus arcu bibendum. 
                    Amet justo donec enim diam vulputate ut. 
                    Non odio euismod lacinia at. Eu facilisis sed odio morbi quis.
                </p>
            </div>
            <Menu />
        </div>
    )
}

export default Single;
