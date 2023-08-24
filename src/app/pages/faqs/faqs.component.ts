import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type AccordionOptions, type AccordionItem, type AccordionInterface, Accordion } from "flowbite";
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements AfterViewInit {

  accordionItems: AccordionItem[] = [

  ]

  options: AccordionOptions = {
    // alwaysOpen: true,
    activeClasses: 'bg-white text-gray-900 rotated',
    inactiveClasses: 'text-gray-500',
    onOpen: (item) => {
      console.log('accordion item has been shown');
      console.log(item);
    },
    onClose: (item) => {
      console.log('accordion item has been hidden');
      console.log(item);
    },
    onToggle: (item) => {
      console.log('accordion item has been toggled');
      console.log(item);
    },
  };

  accordion?: AccordionInterface

  constructor() {
  }
  ngOnInit(): void {
    this.accordionItems = [
      {
        id: 'accordion-flush-heading-1',
        triggerEl: document.querySelector('#accordion-flush-heading-1')!,
        targetEl: document.querySelector('#accordion-flush-body-1')!,
        active: true
      },
      {
        id: 'accordion-flush-heading-2',
        triggerEl: document.querySelector('#accordion-flush-heading-2')!,
        targetEl: document.querySelector('#accordion-flush-body-2')!,
        active: true
      },
      {
        id: 'accordion-flush-heading-3',
        triggerEl: document.querySelector('#accordion-flush-heading-3')!,
        targetEl: document.querySelector('#accordion-flush-body-3')!,
        active: true
      },
      {
        id: 'accordion-flush-heading-4',
        triggerEl: document.querySelector('#accordion-flush-heading-4')!,
        targetEl: document.querySelector('#accordion-flush-body-4')!,
        active: true
      },
      {
        id: 'accordion-flush-heading-5',
        triggerEl: document.querySelector('#accordion-flush-heading-5')!,
        targetEl: document.querySelector('#accordion-flush-body-5')!,
        active: true
      },
      {
        id: 'accordion-flush-heading-6',
        triggerEl: document.querySelector('#accordion-flush-heading-6')!,
        targetEl: document.querySelector('#accordion-flush-body-6')!,
        active: true
      },
      {
        id: 'accordion-flush-heading-7',
        triggerEl: document.querySelector('#accordion-flush-heading-7')!,
        targetEl: document.querySelector('#accordion-flush-body-7')!,
        active: true
      },
      {
        id: 'accordion-flush-heading-8',
        triggerEl: document.querySelector('#accordion-flush-heading-8')!,
        targetEl: document.querySelector('#accordion-flush-body-8')!,
        active: true
      },
      {
        id: 'accordion-flush-heading-9',
        triggerEl: document.querySelector('#accordion-flush-heading-9')!,
        targetEl: document.querySelector('#accordion-flush-body-9')!,
        active: true
      },
      {
        id: 'accordion-flush-heading-10',
        triggerEl: document.querySelector('#accordion-flush-heading-10')!,
        targetEl: document.querySelector('#accordion-flush-body-10')!,
        active: true
      },
    ];
    this.accordion = new Accordion(this.accordionItems, this.options);


  }

  ngAfterViewInit(): void {
  }

  toggleAccordion(id: string) {
    console.log(this.accordion)
    // this.accordion?.toggle(id);
  }
}
