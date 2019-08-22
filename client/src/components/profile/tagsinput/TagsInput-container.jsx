import React from 'react';
import TagsInput from './TagsInput-view.jsx';

class TagsInputContainer extends React.Component {

	render() {
		return <TagsInput tagsSuggest={this.state.tagsSuggest}
			onChange={this.handleChange} onSubmit={this.handleSubmit} 
			onClickAddSuggestion={this.handleClickAddSuggestion} onRemoveTagClick={this.props.onRemoveTagClick}
			userTags={this.props.userTags}
			/>;
	
	}
}

export default TagsInputContainer;
