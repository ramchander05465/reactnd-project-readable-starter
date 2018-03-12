import React from 'react';

const commentForm = () => {
    return(
        <div>
                <Form>
                    <FormGroup>
                        <Input type="textarea" 
                            name="body"
                            onChange={(evt) => this.onChangeHandler(evt)} 
                            value={this.state.body} 
                            placeholder="Comment" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text"
                            name="author" 
                            onChange={(evt) => this.onChangeHandler(evt)}  
                            value={this.state.author} 
                            placeholder="Author Name"
                            disabled = {this.state.editMode ? true:false} />
                    </FormGroup>                     
                </Form>                        
                <div>
                    <Button onClick={() => this.addCommentHandler()}>Save</Button>
                    {this.state.editMode ? <Button onClick={() => this.resetForm()}>Cancel</Button>: null}
                </div>
            </div>
    )
}