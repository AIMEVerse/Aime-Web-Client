
import { Xpell, XUtils, XData, XUI, XEventManager as XEM, XUIObject, XObjectPack } from 'xpell'
import { AimeProfileCard } from './profileUserCard'

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export class DashboardHeader extends XUIObject {
    constructor(data) {

        const ids = XUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-header",
            _html_tag: "div",
            class: "dashboard-header"

        }
        super(data, defaults);

        // <span class="material-icons material-symbols-sharp">menu</span>
        let dashboardHeader = /* html */`
        <div class="top">
            <button id="menu-btn">
                <div class="logo">
                    <img src="/images/aime-logo.svg" alt="AIME logo"/>
                </div>
            </button>
            
            <div class="theme-toggler">
                <span class="material-icons material-symbols-sharp active">light_mode</span>
                <span class="material-icons material-symbols-sharp">dark_mode</span>
            </div>
            <div class="profile">
                <div class="info">
                    <p><span>hey, </span><b>Keren</b> </p>
                    <small class="text-muted">Admin</small>
                </div>
                <div class="profile-photo">
                    <img src="/images/pikachu2.png" alt="Pikachu01"/>
                </div>
            </div>
        </div>`


        const sj = Xpell.parser.xmlString2Xpell(dashboardHeader);
        const sjObj = XUI.create(sj)
        this.append(sjObj)
    }

    async onMount() {

    }


}
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

        // <div class="date">
        //     <input type="date"/>
        // </div>

        // <div class="parcel-position" >
        //     <span class="material-icons material-symbols-sharp" > location_on < /span>
        //         < h4 > -42, 144 < /h4>
        //         < /div>
        //         < h4 > Acquired at August 2nd, 2022 < /h4>
        //             < button > Edit < /button>

        // <span class="material-icons material-symbols-sharp">analytics</span>
        // <div class="middle">
        //     <div class="left">
        //         <h3>Online Users</h3>
        //         <h1>37</h1>
        //     </div>
        // </div>

        let dashboardMain = /* html */`
        <div>

            <div class="header">
                <h1>World Name</h1>
            </div>
                
            <ul class="breadcrumb x2">
                <li><a href="#"><img src="/images/aime-logo.svg" alt="AIME logo"/></a></li>
                <li><a href="#">Analytics</a></li>
                <li><a href="#">Dashboards</a></li>
                <li><a href="#">My world</a></li>

            </ul>

            <div class="players-section">
                <h2>Online Players</h2>
                <div class="players-grid widget">
    
                    <div class="player">
                        <div class="player-attributes">
                            <div class="player-fav"></div>
                            <div class="player-time"></div>
                        </div>
                        <div class="player-image">
                            <img src="/images/pikachu4.png" alt="Pikachu04"/>
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
                            <img src="/images/pikachu3.png" alt="Pikachu03"/>
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
                            <img src="/images/pikachu2.png" alt="Pikachu02"/>
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
                            <img src="/images/pikachu4.png" alt="Pikachu04"/>
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
                            <img src="/images/pikachu2.png" alt="Pikachu02"/>
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
                            <img src="/images/pikachu3.png" alt="Pikachu03"/>
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
                            <img src="/images/pikachu2.png" alt="Pikachu02"/>
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
                            <img src="/images/pikachu4.png" alt="Pikachu04"/>
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
                            <img src="/images/pikachu3.png" alt="Pikachu03"/>
                        </div>
                        <div class="player-tag">
                        <span class="player-online-status"></span>
                            <p class="player-name">Aime User#379</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>`
            
      
                

                let insights = /* html */`<div class="insights"></div>`

                let insight1 = /* html */`
                <div class="sales widget">

                        <small class="text-muted">Last 24 hours</small>
                </div>`

                // let insight1 = /* html */`
                // <div class="sales widget">
                //     <span class="material-icons material-symbols-sharp">analytics</span>
                //     <div class="middle">
                //         <div class="left">
                //             <h3>Online Users</h3>
                //             <h1>37</h1>
                //         </div>
                //     </div>
                //         <small class="text-muted">Last 24 hours</small>
                // </div>`

                let insight2 = /* html */`
                <div class="expenses widget">
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
                </div>`

                let insight3 = /* html */`
                <div class="income widget">
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
                </div>`
                
  
                


                


        // ================= Chart config =================
        const labels =
            ['Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sept',
                'Oct', 'Nov', 'Dec'];
        const data1 = [5, 19, 16, 16, 22, 15, 20, 31, 4, 9, 2, 64];
        const data2 = [2, 13, 7, 6, 16, 8, 16, 23, 0, 3, 0, 21];
        const borderWidth = 2;
        const chartType = 'line';

        const chartConfig = {
            type: chartType,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Max Online Users',
                    data: data1,
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: borderWidth
                }, {
                    label: 'Total sales',
                    data: data2,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(153, 102, 255, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: borderWidth
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        // ================= Chart config End =================
        // ================= Chart config =================
        const labels_2 =
            ['Jan', 'Feb', 'Mar'];
        const data1_2 = [5, 19, 16];
        const data2_2 = [2, 13, 7];
        const borderWidth_2 = 2;
        const chartType_2 = 'doughnut';

        const chartConfig2 = {
            type: chartType_2,
            data: {
                labels: labels_2,
                datasets: [{
                    label: 'Max Online Users',
                    data: data1_2,
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: borderWidth_2
                }, {
                    label: 'Total sales',
                    data: data2_2,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(153, 102, 255, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: borderWidth_2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        // ================= Chart config End =================
        const dashboardChart = new DashboardChart({ _id: "dashboard-chart", _chart_config: chartConfig })
        const dashboardChart2 = new DashboardChart({ _id: "dashboard-chart2", _chart_config: chartConfig2 })

        const sj = Xpell.parser.xmlString2Xpell(dashboardMain);
        const sj_insights = Xpell.parser.xmlString2Xpell(insights);
        const sj_insight1 = Xpell.parser.xmlString2Xpell(insight1);
        const sj_insight2 = Xpell.parser.xmlString2Xpell(insight2);
        const sj_insight3 = Xpell.parser.xmlString2Xpell(insight3);
        const sjObj = XUI.create(sj)
        const sj_insights_Obj = XUI.create(sj_insights)
        const sj_insight1_Obj = XUI.create(sj_insight1)
        const sj_insight2_Obj = XUI.create(sj_insight2)
        const sj_insight3_Obj = XUI.create(sj_insight3)

        this.append(sjObj)
        sjObj.append(sj_insights_Obj)
        sj_insights_Obj.append(sj_insight1_Obj)
        sj_insights_Obj.append(sj_insight2_Obj)
        sj_insights_Obj.append(sj_insight3_Obj)
        sj_insight1_Obj.append(dashboardChart2)
        this.append(dashboardChart)
    }



    async onMount() {

        super.onMount()
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
        

        <div class="recent-updates">
            <h2>Recent Updates</h2>
            <div class="updates widget">
                <div class="update">
                    <div class="profile-photo">
                        <img src="/images/pikachu2.png" alt="Pikachu02"/>
                    </div>
                    <div class="message">
                        <p><b>Player 2</b><p>received 350 Mana Coins</p></p>
                        <small class="text-muted">2 Minutes Ago</small>
                    </div>
                </div>
                <div class="update">
                    <div class="profile-photo">
                        <img src="/images/pikachu3.png" alt="Pikachu03"/>
                    </div>
                    <div class="message">
                        <p><b>Player 03</b> <p>received 170 Mana Coins</p></p>
                        <small class="text-muted">2 Minutes Ago</small>
                    </div>
                </div>
                <div class="update">
                    <div class="profile-photo">
                        <img src="/images/pikachu4.png" alt="Pikachu04"/>
                    </div>
                    <div class="message">
                        <p><b>Player 04</b> <p>received 230 Mana Coins</p></p>
                        <small class="text-muted">2 Minutes Ago</small>
                    </div>
                </div>
            </div>
        </div>

    <div class="sales-analytics">
        <h2>Sales Analytics</h2>
        <div class="item online widget">
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
        <div class="item offline widget">
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
        <div class="item customer widget">
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

    show() {
        const loader = this["getDOMObject"]();

        if (!loader.style.opacity || loader.style.opacity == 0) {
            loader.style.opacity = 1
            loader.style.display = "initial";
        }

        document.onreadystatechange = () => {
            if (document.readyState === 'complete') {
                // document ready
                this.hide()
            }
        };

        let stateCheck = setInterval(() => {

            if (document.readyState === 'complete') {
                clearInterval(stateCheck);
                this.hide()
            }
        }, 100);

        // document.readyState === "complete" && this.hide()
        // setTimeout(() => {
        //     this.hide()
        //     console.log(document.readyState === "complete")
        // }, 3000);

    }

    hide() {
        const loader = this["getDOMObject"]();

        const oStep = 0.1;
        const opacity = setInterval(() => {
            loader.style.opacity -= oStep;
            if (loader.style.opacity <= 0) {
                clearInterval(opacity);
                loader.style.display = "none";
            }
        }, 1000 / 15)

    }

    async onMount() {
        this.show()
        super.onMount()
    }

}

export class DashboardChart extends XUIObject {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private ids: String | null;
    private chartConfig: {} | null;

    constructor(data) {

        const ids = XUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-chart",
            _html_tag: "div",
            class: "dashboard-chart widget",

            // _chart_config: {},

            _chart_type: "line"
            // Chart Types:
            // line
            // bar
            // pie
            // doughnut
            // polarArea
            // radar

        }
        super(data, defaults);
        this.ids = ids

        // ================= Chart config =================
        const labels =
            ['Jan', 'Feb', 'Mar'];
        const data1 = [2, 4, 2];
        const data2 = [1, 3, 5];
        const borderWidth = 2;
        const chartType = 'line';

        const chartConfig = {
            type: chartType,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Label 1',
                    data: data1,
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(80, 210, 0, 0.2)',

                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(80, 210, 0, 1)',

                    ],
                    borderWidth: borderWidth
                }, {
                    label: 'Label 2',
                    data: data2,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(80, 210, 0, 0.2)',

                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(80, 210, 0, 1)',

                    ],
                    borderWidth: borderWidth
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        // ================= Chart config End =================

        // Override default config
        this.chartConfig = data["_chart_config"] ? data["_chart_config"] : chartConfig;

        const canvasEl = XUI.create({ _type: "view", "_html_tag": "canvas", "_id": "chart-users" + ids, "class": "chart-users" })
        this.append(canvasEl)

        
        // let dashboardRight = /* html */`
        // `

        // const sj = Xpell.parser.xmlString2Xpell(dashboardRight);
        // const sjObj = XUI.create(sj)
        // this.append(sjObj)

    }

    async onMount() {
        let canvas = document.getElementById('chart-users' + this.ids) as HTMLCanvasElement;
        let ctx = canvas.getContext("2d");

        this.canvas = canvas;
        this.ctx = ctx;

        // Init chart
        const myChart = new Chart(this.ctx, this.chartConfig);



    }
}

export class DashboardPanel extends XUIObject {
    constructor(data) {

        const ids = XUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-panel",
            _html_tag: "div",
            class: "dashboard-panel",


        }
        super(data, defaults);

        const container = XUI.create({ "_type": "view", "_id": "dashboard-container" + ids, "class": "container" })

        // const dashboardLoader = new DashboardLoader({ _id: "dashboard-loader" })
        const dashboardHeader = new DashboardHeader({ _id: "dashboard-header" })
        const dashboardLeft = new DashboardLeft({ _id: "dashboard-left" })
        const dashboardMain = new DashboardMain({ _id: "dashboard-main" })
        // const profileCard = new AimeProfileCard({ _id: "aime-profile-card" })
        const dashboardRight = new DashboardRight({ _id: "dashboard-right" })




        // const widgets = XUI.create({ "_type": "view", "_id": "widgets" + ids, "class": "widgets" })
        // const cardPack = new CardPack({ _id: "cp" })



        this.append(dashboardHeader)
        this.append(container)
        container.append(dashboardLeft)
        container.append(dashboardMain)
        // this.append(profileCard)
        container.append(dashboardRight)
        // this.append(dashboardLoader)

    }

}


export class DashboardComponent extends XObjectPack {
    static getObjects() {
        return {
            "dashboard-panel": DashboardPanel,
            "dashboard-header": DashboardHeader,
            "dashboard-left": DashboardLeft,
            "dashboard-main": DashboardMain,
            "dashboard-right": DashboardRight,
            "dashboard-chart": DashboardChart,
            "dashboard-loader": DashboardLoader
            // "card": UserCard,
            // "card-pack": CardPack
        }
    }
}


export default DashboardComponent