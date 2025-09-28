package com.angrysurfer.atomic.vaadin.views;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("")
public class HomeView extends VerticalLayout {

    public HomeView() {

        HorizontalLayout toolbar = new HorizontalLayout();
        Button likeButton = new Button("Home", new Icon(VaadinIcon.USER));
        Button commentButton = new Button("Updates", new Icon(VaadinIcon.NEWSPAPER));
        Button shareButton = new Button("Storage", new Icon(VaadinIcon.STORAGE));
        toolbar.add(likeButton, commentButton, shareButton);
    }
}
