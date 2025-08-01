import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { SharedModule } from '../../shared.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'mg-player-search-dialog',
    templateUrl: './player-search-dialog.component.html',
    styleUrls: ['./player-search-dialog.component.scss'],
    imports: [
        SharedModule,
    ],
    standalone: true
})
export class MgPlayerSearchComponent implements OnInit {

    @Input() public previousSearchPlayer: any;

    public playerSearchText: any;
    public playerSearchResult: any;

    constructor(
        private _playerService: PlayerService,
        public _dialogRef: MatDialogRef<MgPlayerSearchComponent>,
    ) { }

    ngOnInit(): void {
    }

    async onSearchPlayer() {
        this.playerSearchResult = await this._playerService.getPlayers(this.playerSearchText, 10);
    }

    selectPlayerFromResultList(player: any, isNeedTransfer: any) {
        if (!isNeedTransfer) {
            this._dialogRef.close(player);
        }
        else {
            const transferObj = {
                shortName: 'Transfer',
            }
            this._dialogRef.close(transferObj);
        }
    }
}
