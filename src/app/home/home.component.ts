import { Component, OnInit, NgZone } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { AppXService } from '@app/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
	quote: string | undefined;
	isLoading = false;

	constructor(
		private appXService: AppXService
	///	private appXDataService: AppXDataService,
	//	private ngZone: NgZone
	) {
	
	}

	ngOnInit() {
		this.isLoading = true;
	}

	navigateTo(link) {
		this.appXService.navigate(link)
	}

	isSelectedTab(type) {
		return this.appXService.islocation(type)
	}
	///////

	importPresentation() {

		let name = 'ICT221'
		let file = ""

		this.appXService.dataUserPresentationAdd(name,file)
	}

	analysePresentation() {

	}


}



/*
	setGroupData(d: any) {
		// this.objectsData = d;
		//   console.log('call', this.objectsData);
	}

	setGroupIdx(i: any) {
		//this.app3Service.objectIndexSet(i);
	}

	setGroupTabIdx(i: any) {
		this.setGroupIdx(i);
		// this.slides.slideTo(i);
		// this.slideChanged();
	}

	getSelectedIdx(i: any) {

		}

		getSelectedIdxNameIcon(fn: any) {
			return null;// this.iconNames[fn];
		}
	*/
