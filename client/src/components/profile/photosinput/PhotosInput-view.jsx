import React from 'react';
import trounoir from './trounoir.jpg';

function PhotosInput(props) {
  return (
	<div className="PhotosInput">
		<form>
			<div className="form-group row">
				<label className="col-sm-2 col-form-label">Photos</label>
				<div className="col-sm-9">
					<div className="row">
						<div className="col-sm-2">
							<div className="card my-2">
								<img src={trounoir} className="card-img px-2 pt-2" alt=""/>
								<div>
									<div className="form-check form-check-inline m-2">
										<input name="main" className="form-check-input" type="radio" onChange={props.onChange}/>
										<label className="form-check-label">1</label>
									</div>
									<span className="miniclose close btn" onClick={props.onClickRemove}>x</span>
								</div>
							</div>
						</div>
						<div className="col-sm-2">
							<div className="card my-2">
								<img src={trounoir} className="card-img px-2 pt-2" alt=""/>
								<div>
									<div className="form-check form-check-inline m-2">
										<input name="main" className="form-check-input" type="radio" onChange={props.onChange}/>
										<label className="form-check-label">2</label>
									</div>
									<span className="miniclose close btn" onClick={props.onClickRemove}>x</span>
								</div>
							</div>
						</div>
						<div className="col-sm-2">
							<div className="card my-2">
								<img src={trounoir} className="card-img px-2 pt-2" alt=""/>
								<div>
									<div className="form-check form-check-inline m-2">
										<input name="main" className="form-check-input" type="radio" onChange={props.onChange}/>
										<label className="form-check-label">3</label>
									</div>
									<span className="miniclose close btn" onClick={props.onClickRemove}>x</span>
								</div>
							</div>
						</div>
						<div className="col-sm-2">
							<div className="card my-2">
								<img src={trounoir} className="card-img px-2 pt-2" alt=""/>
								<div>
									<div className="form-check form-check-inline m-2">
										<input name="main" className="form-check-input" type="radio" onChange={props.onChange}/>
										<label className="form-check-label">4</label>
									</div>
									<span className="miniclose close btn" onClick={props.onClickRemove}>x</span>
								</div>
							</div>
						</div>
						<div className="col-sm-2">
							<div className="card my-2">
								<img src={trounoir} className="card-img px-2 pt-2" alt=""/>
								<div>
									<div className="form-check form-check-inline m-2">
										<input name="main" className="form-check-input" type="radio" onChange={props.onChange}/>
										<label className="form-check-label">5</label>
									</div>
									<span className="miniclose close btn" onClick={props.onClickRemove}>x</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-sm-1">
					<button className="btn btn-primary" onClick={props.onClickAdd}>Ajouter</button>
				</div>
			</div>
		</form>
	</div>
  );
}

export default PhotosInput;