import {
    trigger,
    animate,
    transition,
    style,
    query,
    group
  } from '@angular/animations';
  
  export const routeAnimations = trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%',
          opacity: 0,
          transform: 'scale(0.95)'
        })
      ], { optional: true }),
      
      group([
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.95)' }),
          animate('0.3s ease-in-out', 
            style({ opacity: 1, transform: 'scale(1)' })
          )
        ], { optional: true }),
        
        query(':leave', [
          style({ opacity: 1, transform: 'scale(1)' }),
          animate('0.3s ease-in-out', 
            style({ opacity: 0, transform: 'scale(0.95)' })
          )
        ], { optional: true })
      ])
    ])
  ]);

  export const slideAnimation = trigger('routeAnimations', [
    transition('* => *', [
      query(':enter, :leave', 
        style({ position: 'absolute', width: '100%' }), 
        { optional: true }
      ),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-out', 
            style({ transform: 'translateX(0%)' })
          )
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-out', 
            style({ transform: 'translateX(-100%)' })
          )
        ], { optional: true })
      ])
    ])
  ]);
  
  export const fadeAnimation = trigger('routeAnimations', [
    transition('* => *', [
      query(':enter, :leave', 
        style({ position: 'absolute', width: '100%' }), 
        { optional: true }
      ),
      query(':enter', [
        style({ opacity: 0 })
      ], { optional: true }),
      query(':leave', [
        style({ opacity: 1 }),
        animate('0.3s', style({ opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        animate('0.3s', style({ opacity: 1 }))
      ], { optional: true })
    ])
  ]);