
import { Xpell, XUtils, XData, XUI, XEventManager as XEM, XUIObject, XObjectPack } from 'xpell'






export class DashboardLeft extends XUIObject {
    constructor(data) {

        const ids = XUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-left",
            _html_tag: "div",
            class: "dashboard-left"

        }
        super(data, defaults);

        let dashboardLeft = /* html */`
        <aside>
            <div id="result"></div>
            <div class="top">
                <div class="logo">
                    <img src="/images/aime-logo.svg" alt="AIME logo"/>
                    <h2>AIME</h2>
                </div>
                <div class="close" id="close-btn">
                    <span _html_tag="span" class="material-icons material-symbols-sharp">close</span>
                </div>
            </div>
            <div class="sidebar">
                <a href="#" class="active">
                    <span class="material-icons material-symbols-sharp">person_outline</span>
                    <h3>Customers</h3>
                </a>
                <a href="#" class="">
                    <span class="material-icons material-symbols-sharp">insights</span>
                    <h3>Analytics</h3>
                </a>
                <a href="#" class="">
                    <span class="material-icons material-symbols-sharp">settings</span>
                    <h3>Settings</h3>
                </a>
                <a href="#" class="">
                    <span class="material-icons material-symbols-sharp">logout</span>
                    <h3>Logout</h3>
                </a>
            </div>
        </aside>`


        const sj = Xpell.parser.xmlString2Xpell(dashboardLeft);
        const sjObj = XUI.create(sj)
        this.append(sjObj)
    }

    async onMount() {
        const sideMenu = document.querySelector("aside");
        const menuBtn = document.querySelector("#menu-btn");
        const closeBtn = document.querySelector("#close-btn");

        menuBtn.addEventListener('click', () => {
            sideMenu.style.display = 'block';
        })

        closeBtn.addEventListener('click', () => {
            sideMenu.style.display = 'none';
        })
    }


}

export class DashboardMain extends XUIObject {
    constructor(data) {

        const ids = XUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-main",
            _html_tag: "main",
            class: "main"

        }
        super(data, defaults);

        let dashboardMain = /* html */`
        <div>

        <div class="header">
            <div class="left">
                <h1>AIME Dashboard</h1>
                <div class="date">
                    <input type="date"/>
                </div>
            </div>
            <div class="right">
                <div class="parcel-details">
                    <h3>Parcel Name</h3>
                    <h4>Acquired at August 2nd, 2022</h4>
                    <h4>-42, 144</h4>
                    <button>Edit</button>
                </div>
            </div>

        </div>

            <div class="players-section">
            <h2>Online Players</h2>
            <div class="players-grid">
            
                <div class="player">
                    <div class="player-attributes">
                        <div class="player-fav"></div>
                        <div class="player-time"></div>
                    </div>
                    <div class="player-image">
                        <img src="/images/pikachu3.jpg" alt="Pikachu03"/>
                    </div>
                    <div class="player-tag">
                    <span class="player-online-status"></span>
                        <p class="player-name">Aime User#136</p>
                    </div>
                </div>

                <div class="player">
                    <div class="player-attributes">
                        <div class="player-fav"></div>
                        <div class="player-time"></div>
                    </div>
                    <div class="player-image">
                        <img src="/images/pikachu2.jpg" alt="Pikachu03"/>
                    </div>
                    <div class="player-tag">
                    <span class="player-online-status"></span>
                        <p class="player-name">Aime Bombaba#423</p>
                    </div>
                </div>

                <div class="player">
                    <div class="player-attributes">
                        <div class="player-fav"></div>
                        <div class="player-time"></div>
                    </div>
                    <div class="player-image">
                        <img src="/images/pikachu.jpg" alt="Pikachu03"/>
                    </div>
                    <div class="player-tag">
                    <span class="player-online-status"></span>
                        <p class="player-name">Aime User#379</p>
                    </div>
                </div>

                <div class="player">
                    <div class="player-attributes">
                        <div class="player-fav"></div>
                        <div class="player-time"></div>
                    </div>
                    <div class="player-image">
                        <img src="/images/pikachu.jpg" alt="Pikachu03"/>
                    </div>
                    <div class="player-tag">
                    <span class="player-online-status"></span>
                        <p class="player-name">Aime User#379</p>
                    </div>
                </div>

                <div class="player">
                    <div class="player-attributes">
                        <div class="player-fav"></div>
                        <div class="player-time"></div>
                    </div>
                    <div class="player-image">
                        <img src="/images/pikachu2.jpg" alt="Pikachu03"/>
                    </div>
                    <div class="player-tag">
                    <span class="player-online-status"></span>
                        <p class="player-name">Aime User#379</p>
                    </div>
                </div>

                <div class="player">
                    <div class="player-attributes">
                        <div class="player-fav"></div>
                        <div class="player-time"></div>
                    </div>
                    <div class="player-image">
                        <img src="/images/pikachu.jpg" alt="Pikachu03"/>
                    </div>
                    <div class="player-tag">
                    <span class="player-online-status"></span>
                        <p class="player-name">Aime User#379</p>
                    </div>
                </div>

                <div class="player">
                    <div class="player-attributes">
                        <div class="player-fav"></div>
                        <div class="player-time"></div>
                    </div>
                    <div class="player-image">
                        <img src="/images/pikachu.jpg" alt="Pikachu03"/>
                    </div>
                    <div class="player-tag">
                    <span class="player-online-status"></span>
                        <p class="player-name">Aime User#379</p>
                    </div>
                </div>

                <div class="player">
                    <div class="player-attributes">
                        <div class="player-fav"></div>
                        <div class="player-time"></div>
                    </div>
                    <div class="player-image">
                        <img src="/images/pikachu2.jpg" alt="Pikachu03"/>
                    </div>
                    <div class="player-tag">
                    <span class="player-online-status"></span>
                        <p class="player-name">Aime User#379</p>
                    </div>
                </div>

                <div class="player">
                    <div class="player-attributes">
                        <div class="player-fav"></div>
                        <div class="player-time"></div>
                    </div>
                    <div class="player-image">
                        <img src="/images/pikachu3.jpg" alt="Pikachu03"/>
                    </div>
                    <div class="player-tag">
                    <span class="player-online-status"></span>
                        <p class="player-name">Aime User#379</p>
                    </div>
                </div>

            </div>
        </div>

            <div class="insights">
      
                <div class="sales">
                    <span class="material-icons material-symbols-sharp">analytics</span>
                    <div class="middle">
                        <div class="left">
                            <h3>Online Users</h3>
                            <h1>37</h1>
                        </div>

                    </div>
                    <small class="text-muted">Last 24 hours</small>
                </div>

                <div class="expenses">
                    <span _html_tag="span" class="material-icons material-symbols-sharp">bar_chart</span>
                    <div class="middle">
                        <div class="left">
                            <h3>Total Expenses</h3>
                            <h1>$1,487</h1>
                        </div>

                        <div class="progress">
                            <svg>
                                <circle cx="40" cy="40" r="36"></circle>
                            </svg>
                            <div class="number">
                                <p>65%</p>
                            </div>
                        </div>

                    </div>
                    <small class="text-muted">Last 24 hours</small>
                </div>
  
                <div class="income">
                    <span _html_tag="span" class="material-icons material-symbols-sharp">stacked_line_chart</span>
                    <div class="middle">
                        <div class="left">
                            <h3>Total Income</h3>
                            <h1>$13,476</h1>
                        </div>

                        <div class="progress">
                            <svg>
                                <circle cx="40" cy="40" r="36"></circle>
                            </svg>
                            <div class="number">
                                <p>87%</p>
                            </div>
                        </div>

                    </div>
                    <small class="text-muted">Last 24 hours</small>
                </div>


                </div>
                

        </div>`


        const sj = Xpell.parser.xmlString2Xpell(dashboardMain);
        const sjObj = XUI.create(sj)
        this.append(sjObj)
    }

}

export class DashboardRight extends XUIObject {
    constructor(data) {

        const ids = XUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-right",
            _html_tag: "div",
            class: "right-wrapper"

        }
        super(data, defaults);
        let dashboardRight = /* html */`
        <div class="right">
        <div class="top">
            <button id="menu-btn">
                <span class="material-icons material-symbols-sharp">menu</span>
            </button>
            <div class="theme-toggler">
                <span class="material-icons material-symbols-sharp active">light_mode</span>
                <span class="material-icons material-symbols-sharp">dark_mode</span>
            </div>
            <div class="profile">
                <div class="info">
                    <p><span>hey, </span><b>Pikachu01</b> </p>
                    <small class="text-muted">Admin</small>
                </div>
                <div class="profile-photo">
                    <img src="/images/pikachu.jpg" alt="Pikachu01"/>
                </div>
            </div>
        </div>

        <div class="recent-updates">
            <h2>Recent Updates</h2>
            <div class="updates">
                <div class="update">
                    <div class="profile-photo">
                        <img src="/images/pikachu2.jpg" alt="Pikachu02"/>
                    </div>
                    <div class="message">
                        <p><b>Pikachu 02</b><p>received 350 Mana Coins</p></p>
                        <small class="text-muted">2 Minutes Ago</small>
                    </div>
                </div>
                <div class="update">
                    <div class="profile-photo">
                        <img src="/images/pikachu3.jpg" alt="Pikachu03"/>
                    </div>
                    <div class="message">
                        <p><b>Pikachu 03</b> <p>received 170 Mana Coins</p></p>
                        <small class="text-muted">2 Minutes Ago</small>
                    </div>
                </div>
                <div class="update">
                    <div class="profile-photo">
                        <img src="/images/pikachu4.jpg" alt="Pikachu04"/>
                    </div>
                    <div class="message">
                        <p><b>Pikachu 04</b> <p>received 230 Mana Coins</p></p>
                        <small class="text-muted">2 Minutes Ago</small>
                    </div>
                </div>
            </div>
        </div>

    <div class="sales-analytics">
        <h2>Sales Analytics</h2>
        <div class="item online">
            <div class="icon">
                <span class="material-icons material-symbols-sharp">shopping_cart</span>
            </div>
            <div class="right">
                <div class="info">
                    <h3>ONLINE SALES</h3>
                    <small class="text-muted">Last 24 Hours</small>
                </div>
                <h5 class="success">+41%</h5>
                <h5>3268</h5>
            </div>
        </div>
        <div class="item offline">
            <div class="icon">
                <span class="material-icons material-symbols-sharp">monetization_on</span>
            </div>
            <div class="right">
                <div class="info">
                    <h3>ADS VIEWD</h3>
                    <small class="text-muted">Last 24 Hours</small>
                </div>
                <h5 class="danger">-13%</h5>
                <h5>482</h5>
            </div>
        </div>
        <div class="item customer">
            <div class="icon">
                <span class="material-icons material-symbols-sharp">person</span>
            </div>
            <div class="right">
                <div class="info">
                    <h3>NEW USERS</h3>
                    <small class="text-muted">Last 24 Hours</small>
                </div>
                <h5 class="success">+27%</h5>
                <h5>23</h5>
            </div>
        </div>
        <div class="item add-product">
            <div>
                <span class="material-icons material-symbols-sharp">add</span>
                <h3>Add Product</h3>
            </div>
        </div>
    </div>
    </div>`


        const sj = Xpell.parser.xmlString2Xpell(dashboardRight);
        const sjObj = XUI.create(sj)
        this.append(sjObj)

    }

    async onMount() {
        const themeToggler = document.querySelector(".theme-toggler");

        // Change theme
        themeToggler?.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme-variables');

            themeToggler?.querySelector('span:nth-child(1)')?.classList.toggle('active');
            themeToggler?.querySelector('span:nth-child(2)')?.classList.toggle('active');
        })
    }
}

export class DashboardLoader extends XUIObject {
    constructor(data) {

        const ids = XUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-loader",
            _html_tag: "div",
            class: "dashboard-loader"

        }
        super(data, defaults);

        const loaderContainer = XUI.create({ "_type": "view", "_id": "loaderContainer" + ids, "class": "loader-container" })
        const aimeLoader = XUI.create({ "_type": "view", "_id": "aimeLoader" + ids, "class": "loader" })


        loaderContainer.append(aimeLoader)

        this.append(loaderContainer)

    }

    async onMount() {
        const loader = document.querySelector(".loader-container");
        const oStep = 0.1;

        if (!loader.style.opacity) {
            loader.style.opacity = 1
        }
 
            setTimeout(() => {
                const opacity = setInterval(() => {
                    loader.style.opacity -= oStep;
                    if (loader.style.opacity == 0) {
                        clearInterval(opacity);
                        loader.style.display = "none";
                    }
                }, 50)

            }, 1500)

    }

}

export class DashboardPanel extends XUIObject {
    constructor(data) {

        const ids = XUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-panel",
            _html_tag: "div",
            class: "container",


        }
        super(data, defaults);


        const dashboardLoader = new DashboardLoader({ _id: "dashboard-loader" })
        const dashboardLeft = new DashboardLeft({ _id: "dashboard-left" })
        const dashboardMain = new DashboardMain({ _id: "dashboard-main" })
        const dashboardRight = new DashboardRight({ _id: "dashboard-right" })




        // const widgets = XUI.create({ "_type": "view", "_id": "widgets" + ids, "class": "widgets" })
        // const cardPack = new CardPack({ _id: "cp" })



        this.append(dashboardLeft)
        this.append(dashboardMain)
        this.append(dashboardRight)
        this.append(dashboardLoader)

    }

}


export class DashboardComponent extends XObjectPack {
    static getObjects() {
        return {
            "dashboard-panel": DashboardPanel,
            "dashboard-left": DashboardLeft,
            "dashboard-main": DashboardMain,
            "dashboard-right": DashboardRight,
            "dashboard-loader": DashboardLoader
            // "card": UserCard,
            // "card-pack": CardPack
        }
    }
}


export default DashboardComponent