import React from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';

const List = ({ list }) => {
    //zliczanie unikalnych tytułów

    Array.prototype.contains = function(v) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].title === v.title) return true;
        }
        return false;
    };

    Array.prototype.unique = function() {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (!arr.contains(this[i])) {
                arr.push(this[i]);
            }
        }
        return arr;
    };

    let newList = list.unique();

    //zliczanie kopii
    function compressArray(original) {
        var compressed = [];
        // make a copy of the input array
        var copy = original.slice(0);
        // first loop goes over every element
        for (var i = 0; i < original.length; i++) {
            var myCount = 0;
            // loop over every element in the copy and see if it's the same
            for (var w = 0; w < copy.length; w++) {
                if (original[i].title == copy[w].title) {
                    // increase amount of times duplicate is found
                    myCount++;
                }
            }

            if (myCount > 0) {
                var a = new Object();
                a.value = original[i].title;
                a.count = myCount;
                compressed.push(a);
            }
        }

        return compressed;
    }

    if (list.length > 0) {
        let counts = compressArray(list);

        return (
            <MDBCol className="d-flex flex-row justify-content-center flex-wrap">
                {newList.map((el, index) => {
                    return (
                        <div className="m-3 w-25" key={index}>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>{el.title}</MDBCardTitle>
                                    <hr />
                                    <div className="d-flex flex-row flex-wrap">
                                        <MDBCardText className="justify-content-start">
                                            number of copies: {counts[index].count}
                                        </MDBCardText>
                                        <MDBCardText className="justify-content-end">
                                            <a href={'/swap/book/' + el.title}>see details >></a>
                                        </MDBCardText>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </div>
                    );
                })}
            </MDBCol>
        );
    }
    return <MDBCol className="d-flex flex-row justify-content-center flex-wrap">No results</MDBCol>;
};

export default List;