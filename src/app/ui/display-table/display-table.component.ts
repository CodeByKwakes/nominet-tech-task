import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nameserver } from '../../models';

@Component({
  selector: 'ntt-display-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayTableComponent {
  @Input() nameservers: Nameserver[] | null = [];
}
