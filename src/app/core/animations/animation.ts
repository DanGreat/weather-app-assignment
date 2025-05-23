import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const fadeIn = trigger('fadeIn', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'scale(.9)',
    })
  ),
  transition(':enter', [animate(300)]),
]);

const listAnimation = trigger('listAnimation', [
  transition(':enter', [
    query(
      '.animate',
      [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        stagger(100, [
          animate(300, style({ opacity: 1, transform: 'scale(1)' })),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);

export { fadeIn, listAnimation };
